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
        'relative -translate-x-1/2 -translate-y-full mt-2.5 cursor-pointer text-xs font-mono group': true,
      })}
      onClick={onClick}
    >
      <div className={classNames({
        'px-1 py-0.5 bg-opacity-90 transition-colors': true,
        'bg-primary text-stone-50': markerStyle === 'primary' && (!selectedRestaurant || selectedRestaurant._id === id),
        'group-hover:bg-primary-dark': markerStyle === 'primary' && !selectedRestaurant,
        'bg-secondary': markerStyle === 'secondary' && (!selectedRestaurant || selectedRestaurant._id === id),
        'bg-gray-400 text-stone-50 group-hover:bg-gray-450': selectedRestaurant && selectedRestaurant._id !== id,
      })}
      >
        {label}
      </div>
      <div className={classNames({
        '-mt-0.5 text-base opacity-90 transition-colors': true,
        'text-primary': markerStyle === 'primary' && (!selectedRestaurant || selectedRestaurant._id === id),
        'group-hover:text-primary-dark': markerStyle === 'primary' && !selectedRestaurant,
        'text-accent': markerStyle === 'secondary' && (!selectedRestaurant || selectedRestaurant._id === id),
        'text-gray-400 group-hover:text-gray-450': selectedRestaurant && selectedRestaurant._id !== id,
      })}
      >
        ★
      </div>
    </button>
  </OverlayViewF>
);

export default CustomMarker;
