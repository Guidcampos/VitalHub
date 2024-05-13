import { InputBox, InputBoxMedicalRecord, InputCheckEmail, InputPrescriptionViewBox, InputProfileBox, InputTextLargeModal, InputViewPrescriptionBox } from "./InputStyles"

export const Input = ({
    placeholder,
    fieldValue,
    onChangeText,
    editable = true,
    multiline,
    keyType,
    placeholderTextColor,
    verificado = true,
    onBlur,
    secureTextEntry = false
}) => {
    return (
        <InputBox
            placeholder={placeholder}
            keyboardType={keyType}
            value={fieldValue}
            multiline={multiline}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={secureTextEntry}
            editable={editable}
            onBlur={onBlur}
            verificado={verificado}
        />
    )
}


export const InputEmail = ({
    placeholder,
    fieldValue,
    onChangeText,
    keyType,
    placeholderTextColor,
    maxLength
}) => {
    return (
        <InputCheckEmail
            placeholder={placeholder}
            keyboardType={keyType}
            value={fieldValue}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
        />
    )
}

export const InputProfile = ({
    placeholder,
    fieldValue,
    onChangeText,
    editable,
    keyType,
    placeholderTextColor,
    maxLength,
    verificado,
    onBlur
}) => {
    return (
        <InputProfileBox
            placeholder={placeholder}
            keyboardType={keyType}
            value={fieldValue}
            editable={editable}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            onBlur={onBlur}
            verificado={verificado}
        />
    )
}


export const InputMedicalRecord = ({
    placeholder,
    fieldValue,
    editable,
    multiline,
    onChangeText,
    keyType,
    placeholderTextColor,
    maxLength
}) => {

    return (

        <InputBoxMedicalRecord
            placeholder={placeholder}
            keyboardType={keyType}
            value={fieldValue}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            editable={editable}
            multiline={multiline}
        />
    )
}

export function LargeInputModal({
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType,
    maxLength,
    placeholderTextColor,
    editable = true,
    secureTextEntry = false
}) {
    return (
        <InputTextLargeModal
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    )
}

export const InputViewPrescription = ({
    placeholder,
    fieldValue,
    multiline,
    onChangeText,
    editable,
    keyType,
    placeholderTextColor,
    maxLength,
}) => {
    return (
        <InputViewPrescriptionBox
            placeholder={placeholder}
            editable={editable}
            keyboardType={keyType}
            value={fieldValue}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            multiline={multiline}
        />
    )
}

export const InputPrescriptionView = ({
    placeholder,
    fieldValue,
    editable,
    multiline,
    onChangeText,
    keyType,
    placeholderTextColor,
    maxLength,
}) => {
    return (
        <InputPrescriptionViewBox
            placeholder={placeholder}
            keyboardType={keyType}
            editable={editable}
            value={fieldValue}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            multiline={multiline}
        />
    )
}

