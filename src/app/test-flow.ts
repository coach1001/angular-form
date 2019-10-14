export const TestFlow = {
    route: 'register',
    stepper: 'flat-linear',
    steps: [
        {
            name: 'registration',
            validations: [
                { type: 'mustMatch', value: ['password', 'confirmPassword'] }
            ],
            elements: [
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    layout: { stretchLarge: 50, stretchSmall: 100 },
                    name: 'email',
                    validations: [
                        { type: 'required' },
                        { type: 'email' }
                    ]
                },
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    layout: { stretchLarge: 50, stretchSmall: 100 },
                    name: 'password',
                    validations: [
                        { type: 'required' }
                    ]
                },
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    layout: { stretchLarge: 50, stretchSmall: 100 },
                    name: 'confirmPassword',
                    validations: [
                        { type: 'required' }
                    ]
                }
            ]
        },
        {
            name: 'registrationOtp',
            elements: [
                {
                    type: 'CONTROL',
                    subType: 'NUMBER_INPUT',
                    layout: { stretchLarge: 50, stretchSmall: 100 },
                    name: 'otpInput',
                    validations: [
                        { type: 'required' }
                    ]
                }
            ]
        },
        {
            name: 'profileInformation',
            elements: [
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    layout: { stretchLarge: 50, stretchSmall: 100 },
                    name: 'firstName'
                },
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    layout: { stretchLarge: 50, stretchSmall: 100 },
                    name: 'lastName'
                },
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    layout: { stretchLarge: 50, stretchSmall: 100 },
                    name: 'mobileNumber'
                }
            ]
        }
    ]
}