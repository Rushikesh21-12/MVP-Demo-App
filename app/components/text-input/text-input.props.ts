export interface TextInputProps {
    title: string
    errorName: string
    value?: string
    placeholder?: string
    onChangeText?: (value:unknown) => void
    secureTextEntry?: boolean
    testID?: string
  }
  