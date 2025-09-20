import { BOXES } from './boxes.constants'
import { ProdutoDto } from './create-order-schema'

export type PackedBox = {
  caixa_id: string | null
  produtos: string[]
  observacao?: string
}

const volume = (altura: number, largura: number, comprimento: number) =>
  altura * largura * comprimento

export function packProducts(products: ProdutoDto[]): PackedBox[] {
  const sorted = [...products].sort(
    (a, b) =>
      volume(b.dimensoes.altura, b.dimensoes.largura, b.dimensoes.comprimento) -
      volume(a.dimensoes.altura, a.dimensoes.largura, a.dimensoes.comprimento)
  )

  const result: PackedBox[] = []

  for (const product of sorted) {
    const productVolume = volume(
      product.dimensoes.altura,
      product.dimensoes.largura,
      product.dimensoes.comprimento
    )

    let placed = false
    for (const box of result) {
      const boxData = BOXES.find(b => b.id === box.caixa_id)
      if (!boxData) {
        continue
      }
      const totalBoxVolume = volume(
        boxData.height,
        boxData.width,
        boxData.length
      )
      const usedVolume = box.observacao
        ? 0
        : box.produtos.reduce((sum, pid) => {
            const p = products.find(prod => prod.produto_id === pid)
            return p
              ? sum +
                  volume(
                    p.dimensoes.altura,
                    p.dimensoes.largura,
                    p.dimensoes.comprimento
                  )
              : sum
          }, 0)

      if (usedVolume + productVolume <= totalBoxVolume) {
        box.produtos.push(product.produto_id)
        placed = true
        break
      }
    }

    if (!placed) {
      const fittingBox = BOXES.find(
        b => volume(b.height, b.width, b.length) >= productVolume
      )

      if (!fittingBox) {
        result.push({
          caixa_id: null,
          produtos: [product.produto_id],
          observacao: 'Produto não cabe em nenhuma caixa disponível.',
        })
      } else {
        result.push({
          caixa_id: fittingBox.id,
          produtos: [product.produto_id],
        })
      }
    }
  }

  for (const box of result) {
    box.produtos.sort()
  }

  return result
}
