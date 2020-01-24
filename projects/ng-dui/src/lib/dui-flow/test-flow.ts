import { ElementType } from '../dui-form/services/dui-elements.enum';

export const TestModule = {
    system: 'portal',
    module: 'account',
    flows: [
        {
            flow: 'passwordReset',
            stepper: 'flat-linear',
            resumable: true,
            actions: [],
            steps: [
                {
                    name: 'enterNewPassword',
                    icon: 'cicon-edit',
                    uiTemplate: 'defaultObject',
                    elementType: ElementType.Object,
                    validations: [
                        { type: 'mustMatch', value: ['newPassword', 'confirmPassword'] }
                    ],
                    elements: [
                        {
                            uiTemplate: 'defaultHideableText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 100, stretchSmall: 100 },
                            name: 'oldPassword',
                            validations: [
                                { type: 'required' }                                
                            ]
                        },
                        {
                            uiTemplate: 'defaultHideableText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            name: 'newPassword',
                            validations: [
                                { type: 'required' }                                
                            ]
                        },
                        {
                            uiTemplate: 'defaultHideableText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            name: 'confirmPassword',
                            validations: [
                                { type: 'required' }                                
                            ]
                        },
                    ] 
                },
                {
                    name: 'done',
                    icon: 'cicon-tick',
                    uiTemplate: 'defaultObject',
                    elementType: ElementType.Object,
                    elements: []
                }
            ]
        },
        {
            flow: 'registration',
            stepper: 'flat-linear',
            resumable: true,
            actions: [
                { trigger: 'POST_FLOW', type: 'SERVER_TASK', value: 'register-user' },
                { trigger: 'POST_FLOW', type: 'ABSOLUTE_REDIRECT', value: '/' }
            ],
            steps: [
                {
                    name: 'signup',
                    icon: 'cicon-profile-add',
                    uiTemplate: 'defaultObject',
                    elementType: ElementType.Object,
                    validations: [
                        { type: 'mustMatch', value: ['password', 'confirmPassword'] }
                    ],
                    elements: [
                        {
                            uiTemplate: 'defaultText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            name: 'email',
                            validations: [
                                { type: 'required' },
                                { type: 'email' }
                            ]
                        },
                        {
                            uiTemplate: 'defaultSelect',
                            elementType: ElementType.Control,
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
                            uiTemplate: 'defaultNumber',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 35, stretchSmall: 70 },
                            name: 'mobileNumber',
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            uiTemplate: 'defaultHideableText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            name: 'password',
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            uiTemplate: 'defaultHideableText',
                            elementType: ElementType.Control,
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
                    uiTemplate: 'defaultObject',
                    elementType: ElementType.Object,
                    elements: [
                        {
                            uiTemplate: 'defaultNumber',
                            elementType: ElementType.Control,
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
                    uiTemplate: 'defaultObject',
                    elementType: ElementType.Object,
                    elements: [
                        {
                            uiTemplate: 'defaultSelect',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 16, stretchSmall: 100 },
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
                            uiTemplate: 'defaultText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 42, stretchSmall: 100 },
                            name: 'firstName',
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            uiTemplate: 'defaultText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 42, stretchSmall: 100 },
                            name: 'lastName',
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            uiTemplate: 'defaultBoolean',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 42, stretchSmall: 100 },
                            name: 'hasDependants'
                        },
                        {
                            uiTemplate: 'defaultArray',
                            elementType: ElementType.Array,
                            layout: { stretchLarge: 100, stretchSmall: 100 },
                            name: 'dependants',
                            reactivity: [
                                { type: 'clearWhen', expression: "!hasDependants" },
                                { type: 'visibleWhen', expression: "hasDependants" }
                            ],
                            elements: [
                                {
                                    uiTemplate: 'defaultText',
                                    elementType: ElementType.Control,
                                    layout: { stretchLarge: 30, stretchSmall: 100 },
                                    name: 'firstName',
                                    validations: [
                                        { type: 'required' }
                                    ]
                                },
                                {
                                    uiTemplate: 'defaultText',
                                    elementType: ElementType.Control,
                                    layout: { stretchLarge: 30, stretchSmall: 100 },
                                    name: 'lastName',
                                    validations: [
                                        { type: 'required' }
                                    ]
                                },
                                {
                                    uiTemplate: 'defaultDatetime',
                                    elementType: ElementType.Control,
                                    layout: { stretchLarge: 30, stretchSmall: 100 },
                                    name: 'dateOfBirth',
                                    validations: [
                                        { type: 'required' }
                                    ]
                                }
                            ]
                        },
                        {
                            uiTemplate: 'defaultBoolean',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 42, stretchSmall: 100 },
                            name: 'hasDriversLicence'
                        },
                        {
                            uiTemplate: 'defaultObject',
                            elementType: ElementType.Object,
                            layout: { stretchLarge: 100, stretchSmall: 100 },
                            name: 'driversLicenceDetails',
                            reactivity: [
                                { type: 'clearWhen', expression: "!hasDriversLicence" },
                                { type: 'visibleWhen', expression: "hasDriversLicence" }
                            ],
                            elements: [
                                {
                                    uiTemplate: 'defaultSelect',
                                    elementType: ElementType.Control,
                                    layout: { stretchLarge: 50, stretchSmall: 100 },
                                    name: 'code',
                                    validations: [
                                        { type: 'required' }
                                    ],
                                    options: [
                                        { value: { id: 'A', metaData: {} }, displayValue: 'Code A' },
                                        { value: { id: 'B', metaData: {} }, displayValue: 'Code B' },
                                        { value: { id: 'C', metaData: {} }, displayValue: 'Code C' }
                                    ],
                                },
                                {
                                    uiTemplate: 'defaultDatetime',
                                    elementType: ElementType.Control,
                                    layout: { stretchLarge: 50, stretchSmall: 100 },
                                    name: 'dateAcquired',
                                    validations: [
                                        { type: 'required' }
                                    ]
                                }
                            ]
                        },
                        {
                            uiTemplate: 'defaultDatetime',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            name: 'dateOfBirth',
                            validations: [
                                { type: 'required' }
                            ]
                        }
                    ]
                },
                {
                    name: 'done',
                    icon: 'cicon-tick',
                    uiTemplate: 'defaultObject',
                    elementType: 0,
                    elements: []
                }
            ]
        }
    ]
}