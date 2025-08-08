import './AddressBar.css'
import { mosqueInfo } from '../../data/navigationData'

const AddressBar = () => {
  return (
    <div className="address-bar">
      <p>📍 {mosqueInfo.address}</p>
    </div>
  )
}

export default AddressBar 