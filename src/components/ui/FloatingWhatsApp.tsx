"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

type FloatingWhatsAppProps = {
  phoneNumber: string; // Número sin el +, ej: "51987654321"
  message?: string; // Mensaje predefinido
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
  tooltipText?: string;
  backgroundColor?: string;
  textColor?: string;
  zIndex?: number;
};

export const FloatingWhatsApp = ({
  phoneNumber,
  message = "¡Hola! Me gustaría obtener más información.",
  position = "bottom-right",
  size = "md",
  showTooltip = true,
  tooltipText = "¡Conversemos por WhatsApp!",
  backgroundColor = "#25D366",
  textColor = "#ffffff",
  zIndex = 50,
}: FloatingWhatsAppProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Construir URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Clases de posición
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6", 
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  // Clases de tamaño
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  // Clases de tamaño del ícono
  const iconSizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-10 h-10",
  };

  // Clases de posición del tooltip
  const tooltipPositionClasses = {
    "bottom-right": "bottom-full right-0 mb-2",
    "bottom-left": "bottom-full left-0 mb-2",
    "top-right": "top-full right-0 mt-2", 
    "top-left": "top-full left-0 mt-2",
  };

  const handleClick = () => {
    window.open(whatsappUrl, "_blank");
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Botón principal */}
      <div
        className={`fixed ${positionClasses[position]} group cursor-pointer`}
        style={{ zIndex }}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        {/* Tooltip */}
        {showTooltip && isTooltipVisible && !isExpanded && (
          <div
            className={`absolute ${tooltipPositionClasses[position]} px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-200`}
          >
            {tooltipText}
            <div
              className={`absolute w-2 h-2 bg-gray-800 rotate-45 ${
                position.includes("bottom") 
                  ? "top-full -mt-1" 
                  : "bottom-full -mb-1"
              } ${
                position.includes("right") 
                  ? "right-4" 
                  : "left-4"
              }`}
            />
          </div>
        )}

        {/* Botón expandido */}
        {isExpanded && (
          <div
            className={`absolute ${tooltipPositionClasses[position]} bg-white rounded-xl shadow-2xl p-4 w-80 border border-gray-200`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor }}
                >
                  <MessageCircle className="w-5 h-5" style={{ color: textColor }} />
                </div>
                <span className="font-semibold text-gray-800">WhatsApp</span>
              </div>
              <button
                onClick={toggleExpanded}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">¿Necesitas ayuda?</p>
              <p className="text-xs text-gray-500">{message}</p>
            </div>

            <button
              onClick={handleClick}
              className="w-full py-2 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              style={{ backgroundColor }}
            >
              <MessageCircle className="w-4 h-4" />
              Iniciar conversación
            </button>
          </div>
        )}

        {/* Botón principal */}
        <div
          className={`
            ${sizeClasses[size]} 
            rounded-full 
            flex 
            items-center 
            justify-center 
            shadow-lg 
            hover:shadow-xl 
            transition-all 
            duration-300 
            hover:scale-110 
            active:scale-95
            ${isExpanded ? 'scale-90' : ''}
          `}
          style={{ backgroundColor }}
          onClick={isExpanded ? toggleExpanded : handleClick}
          onDoubleClick={toggleExpanded}
        >
          <MessageCircle 
            className={`${iconSizeClasses[size]} animate-pulse`} 
            style={{ color: textColor }} 
          />
        </div>

        {/* Indicador de notificación */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">1</span>
        </div>
      </div>

      {/* Overlay para cerrar cuando está expandido */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-transparent"
          style={{ zIndex: zIndex - 1 }}
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}; 