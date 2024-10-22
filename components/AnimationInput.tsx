import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Colors, RED } from "@/constants/Colors";
import { AnimationInputMethods, AnimationInputProps } from "@/types";

const AnimationInput = forwardRef<AnimationInputMethods, AnimationInputProps>(( props, ref ) => {

    const {
        inactiveColor = Colors.light.gray,
        activeColor = Colors.light.dark,
        errorColor = RED,
        backgroundColor = Colors.light.gameBg,
        fontColor,
        fontSize = 14,
        fontFamily,
        error,
        paddingHorizontal = 14,
        paddingVertical = 8,
        style,
        placeholder,
        value: providedValue = '',
        onChangeText,
        ...inputProps
    } = props

    const [value, setValue] = useState(providedValue)

    const inputRef = useRef<TextInput>(null)
    const placeholderAnimated = useSharedValue(providedValue ? 1 : 0)
    const placeholderSize = useSharedValue(0)
    const colorAnimated = useSharedValue(0)

    const focus = () => inputRef.current?.focus()
    const blur = () => inputRef.current?.blur()
    const isFocused = () =>  Boolean(inputRef.current?.isFocused())
    const clear = () => {
        Boolean(inputRef.current?.clear())
        setValue('')
    }

    const handleFocus = () => {
        placeholderAnimated.value = withTiming(1)
        focus()
    }

    const handleBlur = () => {
        placeholderAnimated.value = withTiming(1)
        blur()
    }

    const handleChangeText = (text: string) => {
        onChangeText && onChangeText(text)
        setValue(text)
        if (!isFocused()) {
            colorAnimated.value = withTiming(error ? 2 : 0);
        }
    }

    const handlePlaceholderLayout = useCallback(({nativeEvent}: any) => {
        const { width } = nativeEvent.layout
        placeholderSize.value = width
    }, [placeholderSize]) 
    
    const animatedPlaceholderSpacerStyle = useAnimatedStyle(() => ({
        width: interpolate(
            placeholderAnimated.value,
            [0,1],
            [0, placeholderSize.value * 0.7 + 18],
            Extrapolation.CLAMP
        )
    }))

    const animatedPlaceholderTextStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            colorAnimated.value,
            [0, 1, 2],
            [inactiveColor, activeColor, errorColor]
        ),
    }))

    const animatedContainerStyle = useAnimatedStyle(() => ({
        borderColor: placeholderSize.value > 0 ? interpolateColor(
            colorAnimated.value,
            [0, 1, 2],
            [inactiveColor, activeColor, activeColor]
        ) : inactiveColor
    }))

    const animatedPlaceholderStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: interpolate(
                    placeholderAnimated.value,
                    [0, 1],
                    [1, -(paddingVertical + fontSize * 0.8)],                  
                )
            },
            {
                scale: interpolate(
                    placeholderAnimated.value,
                    [0, 1],
                    [1, 0.8],
                )
            },
            {
                translateX: interpolate(
                    placeholderAnimated.value,
                    [0,1],
                    [0, -110 * 0.2],
                )
            }
        ]
    }))

    useImperativeHandle(ref, () => ({
        focus: handleFocus,
        blur: handleBlur,
        isFocused: isFocused(),
        clear: clear
    }))

    const styles = StyleSheet.create({
        container: {
          alignSelf: "stretch",
          flexDirection: "row",
          borderWidth: 1,
          borderRadius: 5,
        },
        inputContainer: {
            flex: 1,
            paddingHorizontal,
            paddingVertical,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        input: {
            flex: 1,
            fontSize: fontSize,
            fontFamily,
            color: fontColor,
            height: 20
        },
        placeholder: {
            position: 'absolute',
            top: paddingVertical,
            left: paddingHorizontal
        },
        placeholderText: {
          fontSize: fontSize,
          fontFamily 
        },
        placeholderSpacer: {
           position: 'absolute',
           top: -1,
           backgroundColor: Colors.dark.text,
           height: 1
        },
      });

      const placeholderStyle = useMemo(() => {
        return [styles.placeholder, animatedPlaceholderStyles]
      }, [styles.placeholder, animatedPlaceholderStyles])

  return (
    <Animated.View style={[styles.container, animatedContainerStyle, style]}>
      <TouchableWithoutFeedback onPress={handleFocus}>
        <View style={styles.inputContainer}>
          <TextInput 
            {...inputProps}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...inputProps}
            ref={inputRef}
            value={value}
            placeholder=""
            style={styles.input}
            onChangeText={handleChangeText}
          />
        </View>
      </TouchableWithoutFeedback>
      <Animated.View 
        style={[styles.placeholderSpacer, animatedPlaceholderSpacerStyle]}
      />
      <Animated.View
        style={placeholderStyle}
        onLayout={handlePlaceholderLayout}
        pointerEvents='none'
      >
        <Animated.Text style={[styles.placeholderText, animatedPlaceholderTextStyle]}>
            {placeholder}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
});

export default AnimationInput;
AnimationInput.displayName = 'AnimationInput'


