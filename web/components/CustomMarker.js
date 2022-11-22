import classNames from 'classnames';
import { OverlayViewF } from '@react-google-maps/api';

const CustomMarker = ({
  id,
  label,
  markerStyle,
  position,
  selectedRestaurant,
  onClick,
}) => (
  <OverlayViewF
    position={position}
    mapPaneName="overlayMouseTarget"
  >
    <button
      type="button"
      className={classNames({
        'relative -translate-x-1/2 -translate-y-full mt-2.5 cursor-pointer text-xs font-mono': true,
      })}
      onClick={onClick}
    >
      <div className={classNames({
        'px-1 py-0.5 bg-opacity-90 transition-colors': true,
        'bg-primary-dark text-stone-50': markerStyle === 'primary' && (!selectedRestaurant || selectedRestaurant._id === id),
        'bg-secondary': markerStyle === 'secondary' && (!selectedRestaurant || selectedRestaurant._id === id),
        'bg-gray-400 text-stone-50': selectedRestaurant && selectedRestaurant._id !== id,
      })}
      >
        {label}
      </div>
      <div className={classNames({
        '-mt-0.5 text-base': true,
        'text-primary text-primary-dark': markerStyle === 'primary' && (!selectedRestaurant || selectedRestaurant._id === id),
        'text-accent': markerStyle === 'secondary' && (!selectedRestaurant || selectedRestaurant._id === id),
        'text-gray-400': selectedRestaurant && selectedRestaurant._id !== id,
      })}
      >
        ★
      </div>
    </button>
  </OverlayViewF>
);

export default CustomMarker;
