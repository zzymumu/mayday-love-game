import type { March28CharacterId } from './march28'
import type { March28MorningRoute } from './march28Morning'
import { march28MorningWenRoute } from './march28MorningWen'
import { march28MorningMasaRoute } from './march28MorningMasa'
import { march28MorningStoneRoute } from './march28MorningStone'
import { march28MorningYanmingRoute } from './march28MorningYanming'

export const march28MorningVisitorRoutes: Record<Exclude<March28CharacterId, 'ashin'>, March28MorningRoute> = {
  wen: march28MorningWenRoute,
  masa: march28MorningMasaRoute,
  stone: march28MorningStoneRoute,
  yanming: march28MorningYanmingRoute,
}
