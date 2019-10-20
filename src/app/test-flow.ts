export const TestModule = {
    system: 'portal',
    module: 'account',
    flows: [
        {
            flow: 'registration',
            stepper: 'flat-linear',
            steps: [
                {
                    name: 'signup',
                    icon: 'cicon-profile-add',
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
                            subType: 'AUTOCOMPLETE_INPUT',
                            layout: { stretchLarge: 15, stretchSmall: 30 },
                            name: 'mobilePrefix',
                            validations: [
                                { type: 'required' }
                            ],
                            options: [
                                { value: '27', displayValue: '+27' },
                                { value: '264', displayValue: '+264' },
                            ]
                        },
                        {
                            type: 'CONTROL',
                            subType: 'NUMBER_INPUT',
                            layout: { stretchLarge: 35, stretchSmall: 70 },
                            name: 'mobileNumber',
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            type: 'CONTROL',
                            subType: 'HIDDEN_INPUT',
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            name: 'password',
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            type: 'CONTROL',
                            subType: 'HIDDEN_INPUT',
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            name: 'confirmPassword',
                            validations: [
                                { type: 'required' }
                            ]
                        }
                    ]
                },
                {
                    name: 'otp',
                    icon: 'cicon-contact',
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
                    name: 'profile',
                    icon: 'cicon-user',
                    elements: [
                        {
                            type: 'CONTROL',
                            subType: 'AUTOCOMPLETE_INPUT',
                            layout: { stretchLarge: 15, stretchSmall: 30 },
                            name: 'title',
                            validations: [
                                { type: 'required' }
                            ],
                            options: [
                                { value: '0', displayValue: 'Mr' },
                                { value: '1', displayValue: 'Mrs' },
                                { value: '2', displayValue: 'Ms' }
                            ],
                        },
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            layout: { stretchLarge: 35, stretchSmall: 70 },
                            name: 'firstName',
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            name: 'lastName',
                            validations: [
                                { type: 'required' }
                            ]
                        }
                    ]
                },
                {
                    name: 'done',
                    icon: 'cicon-tick',
                    elements: []
                }
            ]
        }
    ]
}