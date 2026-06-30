import { VehicleLineupItem } from '@/types/vehicleLineup'

export const vehicleLineup: VehicleLineupItem[] = [
  {
    id: 'chery-q',
    model_name: 'CHERY Q',
    logo_text: 'CHERY Q',
    category: 'Compact SUV',
    power_label: 'Maximum power (kW/PS)',
    power_value: '90/122',
    torque_label: 'Maximum torque (NM)',
    torque_value: '115',
    dimension_label: 'Dimensions (L x W x H) (mm.)',
    dimension_value: '4195 x 1811 x 1568',
    vehicle_side_image_desktop: 'https://chery-thailand.com/strapi_prod/Chery_Q_Chery_Q_SKD_1_46cb0f0fc1_25c53c15c3.png',
    vehicle_side_image_mobile: 'https://chery-thailand.com/strapi_prod/Chery_Q_Chery_Q_SKD_1_46cb0f0fc1_25c53c15c3.png',
    watermark_text: 'CHERY Q',
    cta_text: 'CHERY Q',
    cta_link: '/models/chery-q',
    sort_order: 1,
    status: 'active',
  },
  {
    id: 'v23',
    model_name: 'V23',
    logo_text: 'V23',
    category: 'Electric SUV',
    power_label: 'Maximum power (kW/PS)',
    power_value: '-',
    torque_label: 'Maximum torque (NM)',
    torque_value: '-',
    dimension_label: 'Dimensions (L x W x H) (mm.)',
    dimension_value: '-',
    vehicle_side_image_desktop: 'https://chery-thailand.com/strapi_prod/Group_1000004370_a3909baced.png',
    vehicle_side_image_mobile: 'https://chery-thailand.com/strapi_prod/Group_1000004370_a3909baced.png',
    watermark_text: 'V23',
    cta_text: 'V23',
    cta_link: '/models/v23',
    sort_order: 2,
    status: 'active',
  },
  {
    id: 'tiggo-8-csh',
    model_name: 'TIGGO 8 CSH',
    logo_text: 'TIGGO 8 CSH',
    category: 'Hybrid SUV',
    power_label: 'Maximum power (kW/PS)',
    power_value: '-',
    torque_label: 'Maximum torque (NM)',
    torque_value: '-',
    dimension_label: 'Dimensions (L x W x H) (mm.)',
    dimension_value: '-',
    vehicle_side_image_desktop: 'https://chery-thailand.com/strapi_prod/Mask_group_0ccc865fa8.png',
    vehicle_side_image_mobile: 'https://chery-thailand.com/strapi_prod/Mask_group_0ccc865fa8.png',
    watermark_text: 'TIGGO 8 CSH',
    cta_text: 'TIGGO 8 CSH',
    cta_link: '/models/tiggo-8-csh',
    sort_order: 3,
    status: 'active',
  },
]

export function getActiveVehicleLineup(): VehicleLineupItem[] {
  return vehicleLineup
    .filter(item => item.status === 'active')
    .sort((a, b) => a.sort_order - b.sort_order)
}
