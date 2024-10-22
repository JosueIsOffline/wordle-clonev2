
import { TextInputProps, TextStyle } from "react-native";

export enum variantEnum {
    outlined = 'outlined', 
    standard = 'standard'
}

interface AnimationInputMethods {
    focus: () => void;
    blur: () => void;
    isFocused: Boolean;
    clear: () => void;
}

interface AnimationInputProps extends TextInputProps {
    placeholder?: string,
    fontSize?: number;
    fontColor?: string;
    fontFamily?: string;
    paddingVertical?: number;
    paddingHorizontal?: number;
    marginTop?: number; // Margen superior
    marginBottom?: number; // Margen inferior
    marginLeft?: number; // Margen izquierdo
    marginRight?: number; // Margen derecho
    borderRadius?: number; // Radio del borde
    borderWidth?: number; // Ancho del borde
    borderColor?: string; // Color del borde
    backgroundColor?: string; // Color de fondo
    animationType?: 'fade' | 'slide' | 'scale' | 'bounce'; // Tipo de animación
    animationDuration?: number; // Duración de la animación en milisegundos
    animationDelay?: number; // Retraso de la animación en milisegundos
    animateOnFocus?: boolean; // Activar animación al recibir el foco
    animateOnBlur?: boolean; // Activar animación al perder el foco
    shadowColor?: string; // Color de la sombra
    shadowOffset?: { width: number; height: number }; // Desplazamiento de la sombra
    shadowOpacity?: number; // Opacidad de la sombra
    shadowRadius?: number; // Radio de la sombra
    width?: number | string; // Ancho del componente
    height?: number | string; // Altura del componente
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'; // Capitalización automática
    editable?: boolean; // Si el campo es editable
    maxLength?: number; // Longitud máxima del texto
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'; // Tipo de teclado
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send'; // Tipo de botón de retorno del teclado
    secureTextEntry?: boolean; // Ocultar el texto (para contraseñas)
    multiline?: boolean; // Permitir múltiples líneas
    numberOfLines?: number; // Número de líneas (para multiline)
    inactiveColor?: string;
    activeColor?: string;
    errorColor?: string;
    error?: string
}

export { AnimationInputMethods, AnimationInputProps }