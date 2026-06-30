export interface VehicleLineupItem {
  id: string
  model_name: string
  logo_text: string
  category: string
  power_label: string
  power_value: string
  torque_label: string
  torque_value: string
  dimension_label: string
  dimension_value: string
  vehicle_side_image_desktop: string
  vehicle_side_image_mobile: string
  watermark_text: string
  cta_text: string
  cta_link: string
  sort_order: number
  status: 'active' | 'inactive'
}

export interface VehicleLineupShowcaseProps {
  items?: VehicleLineupItem[]
}