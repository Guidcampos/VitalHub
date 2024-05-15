import { Input, InputMedicalRecord, InputPrescriptionView, InputProfile, InputViewPrescription, LargeInputModal } from "../Input/Input"
import { Label, LabelMedicalRecord } from "../Label/Label"
import { FieldContent, FieldContentMedicalRecord, FotoPrescriptions, InputFoto } from "./BoxInputStyles"
import { InputLabelModal, SubtitleErro1 } from "../Title/TitleStyle"


export const BoxInput = ({
    fieldWidth = 100,
    editable = true,
    textLabel,
    placeholder,
    fieldValue = null,
    onChangeText = null,
    keyType = 'default',
    onBlur,
    verificado = true,
    verificadoCEP = true,
    maxLength
}) => {
    return (
        <FieldContent fieldWidth={fieldWidth}>

            <Label textLabel={textLabel} />

            <InputProfile verificado={verificado} onBlur={onBlur} editable={editable} placeholder={placeholder} fieldValue={fieldValue} onChangeText={onChangeText} keyType={keyType} maxLength={maxLength} />

            {verificadoCEP ? null : <SubtitleErro1>O CEP deve ter exatamente 8 dígitos</SubtitleErro1>}

        </FieldContent>
    )
}

export const BoxInputMedicalRecord = ({
    fieldWidth = 100,
    editable = true,
    textLabel,
    multiline,
    placeholder,
    fieldValue = null,
    onChangeText = null,
    keyType = 'default',
    maxLength,
    placeholderTextColor = '#34898F'
}) => {
    return (
        <FieldContentMedicalRecord fieldWidth={fieldWidth}>

            <LabelMedicalRecord textLabel={textLabel} />

            <InputMedicalRecord multiline={multiline} editable={editable} placeholder={placeholder} fieldValue={fieldValue} onChangeText={onChangeText} keyType={keyType} maxLength={maxLength} placeholderTextColor={placeholderTextColor} />

        </FieldContentMedicalRecord>
    )
}

export const BoxInputMedical = ({
    fieldWidth = 100,
    editable = true,
    multiline,
    textLabel,
    placeholder,
    fieldValue = null,
    onChangeText = null,
    keyType = 'default',
    maxLength,
    placeholderTextColor = '#34898F'
}) => {
    return (
        <FieldContentMedicalRecord fieldWidth={fieldWidth}>

            <Label textLabel={textLabel} />

            <Input multiline={multiline} editable={editable} placeholder={placeholder} fieldValue={fieldValue} onChangeText={onChangeText} keyType={keyType} maxLength={maxLength} placeholderTextColor={placeholderTextColor} />

        </FieldContentMedicalRecord>
    )
}

export const LargeInputBoxModal = ({
    fieldWidth = 100,
    fieldHeight = 90,
    editable = false,
    textLabel,
    placeholder,
    fieldValue = null,
    onChangeText = null,
    keyboardType = "default",
    maxLength,
    placeholderTextColor
}) => {
    return (

        <FieldContent fieldWidth={fieldWidth} fieldHeight={fieldHeight} textLabel={textLabel}>

            <InputLabelModal>{textLabel}</InputLabelModal>

            <LargeInputModal
                placeholder={placeholder}
                editable={editable}
                keyboardType={keyboardType}
                maxLength={maxLength}
                fieldValue={fieldValue}
                onChangeText={onChangeText}
                placeholderTextColor={placeholderTextColor}
            />

        </FieldContent>

    )
}

export const BoxInputViewPrescription = ({
    fieldWidth = 90,
    fieldHeight = 90,
    multiline,
    foto = null,
    editable = true,
    textLabel,
    placeholder,
    fieldValue = null,
    onChangeText = null,
    keyType = 'default',
    maxLength
}) => {
    return (
        <FieldContent fieldWidth={fieldWidth} fieldHeight={fieldHeight}>
            <Label textLabel={textLabel} />

            {foto != null ?
                <InputFoto>
                    <FotoPrescriptions source={{ uri: foto }} />
                </InputFoto>
                : <>
                    <InputViewPrescription multiline={multiline} editable={editable} placeholder={placeholder} fieldValue={fieldValue} onChangeText={onChangeText} keyType={keyType} maxLength={maxLength} />
                </>}
        </FieldContent>
    )
}

export const BoxInputPrescriptionView = ({
    fieldWidth = 90,
    fieldHeight = 90,
    editable = true,
    multiline,
    textLabel,
    placeholder,
    fieldValue = null,
    onChangeText = null,
    keyType = 'default',
    maxLength
}) => {
    return (
        <FieldContent fieldWidth={fieldWidth} fieldHeight={fieldHeight}>

            <Label textLabel={textLabel} />

            <InputPrescriptionView multiline={multiline} editable={editable} placeholder={placeholder} fieldValue={fieldValue} onChangeText={onChangeText} keyType={keyType} maxLength={maxLength} />

        </FieldContent>
    )
}
