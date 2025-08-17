import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface CanvasControlsProps {
  zoomLevel: number;
  onZoom: (direction: 'in' | 'out' | 'reset') => void;
}

export const CanvasControls = ({ zoomLevel, onZoom }: CanvasControlsProps) => {
  return (
    <div className="absolute top-4 right-4 z-30 flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/20">
      <button 
        onClick={() => onZoom('in')}
        className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4 text-gray-600" />
      </button>
      <button 
        onClick={() => onZoom('reset')}
        className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-300 font-mono"
        title="Reset Zoom"
      >
        {Math.round(zoomLevel * 100)}%
      </button>
      <button 
        onClick={() => onZoom('out')}
        className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4 text-gray-600" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      <button 
        className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
        title="Fit to Screen"
      >
        <Maximize2 className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};