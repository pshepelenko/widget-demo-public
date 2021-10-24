import React, { FC } from 'react'

const FormErrorMessage: FC<{ message: string }> = ({ message }) => <p className="text-xs text-red-400">{message}</p>

export default FormErrorMessage
