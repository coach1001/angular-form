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
                    viewTemplate: 'defaultObject',
                    elementType: ElementType.Object,
                    validations: [
                        { type: 'mustMatch', value: ['newPassword', 'confirmPassword'] }
                    ],
                    elements: [
                        {
                            viewTemplate: 'defaultHideableText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 100, stretchSmall: 100 },
                            name: 'oldPassword',
                            validations: [
                                { type: 'required' }                                
                            ]
                        },
                        {
                            viewTemplate: 'defaultHideableText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            name: 'newPassword',
                            validations: [
                                { type: 'required' }                                
                            ]
                        },
                        {
                            viewTemplate: 'defaultHideableText',
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
                    viewTemplate: 'defaultObject',
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
                    viewTemplate: 'defaultObject',
                    elementType: ElementType.Object,
                    validations: [
                        { type: 'mustMatch', value: ['password', 'confirmPassword'] }
                    ],
                    elements: [
                        {
                            viewTemplate: 'defaultText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            name: 'email',
                            validations: [
                                { type: 'required' },
                                { type: 'email' }
                            ]
                        },
                        {
                            viewTemplate: 'defaultSelect',
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
                            viewTemplate: 'defaultNumber',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 35, stretchSmall: 70 },
                            name: 'mobileNumber',
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            viewTemplate: 'defaultHideableText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            name: 'password',
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            viewTemplate: 'defaultHideableText',
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
                    viewTemplate: 'defaultObject',
                    elementType: ElementType.Object,
                    elements: [
                        {
                            viewTemplate: 'defaultNumber',
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
                    viewTemplate: 'defaultObject',
                    elementType: ElementType.Object,
                    elements: [
                        {
                            viewTemplate: 'defaultSelect',
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
                            viewTemplate: 'defaultText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 42, stretchSmall: 100 },
                            name: 'firstName',
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            viewTemplate: 'defaultText',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 42, stretchSmall: 100 },
                            name: 'lastName',
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            viewTemplate: 'defaultBoolean',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 42, stretchSmall: 100 },
                            name: 'hasDependants'
                        },
                        {
                            viewTemplate: 'defaultArray',
                            elementType: ElementType.Array,
                            layout: { stretchLarge: 100, stretchSmall: 100 },
                            name: 'dependants',
                            reactivity: [
                                { type: 'clearWhen', expression: "!hasDependants" },
                                { type: 'visibleWhen', expression: "hasDependants" }
                            ],
                            elements: [
                                {
                                    viewTemplate: 'defaultText',
                                    elementType: ElementType.Control,
                                    layout: { stretchLarge: 30, stretchSmall: 100 },
                                    name: 'firstName',
                                    validations: [
                                        { type: 'required' }
                                    ]
                                },
                                {
                                    viewTemplate: 'defaultText',
                                    elementType: ElementType.Control,
                                    layout: { stretchLarge: 30, stretchSmall: 100 },
                                    name: 'lastName',
                                    validations: [
                                        { type: 'required' }
                                    ]
                                },
                                {
                                    viewTemplate: 'defaultDatetime',
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
                            viewTemplate: 'defaultBoolean',
                            elementType: ElementType.Control,
                            layout: { stretchLarge: 42, stretchSmall: 100 },
                            name: 'hasDriversLicence'
                        },
                        {
                            viewTemplate: 'defaultObject',
                            elementType: ElementType.Object,
                            layout: { stretchLarge: 100, stretchSmall: 100 },
                            name: 'driversLicenceDetails',
                            reactivity: [
                                { type: 'clearWhen', expression: "!hasDriversLicence" },
                                { type: 'visibleWhen', expression: "hasDriversLicence" }
                            ],
                            elements: [
                                {
                                    viewTemplate: 'defaultSelect',
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
                                    viewTemplate: 'defaultDatetime',
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
                            viewTemplate: 'defaultDatetime',
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
                    viewTemplate: 'defaultObject',
                    elementType: ElementType.Object,
                    elements: []
                }
            ]
        }
    ]
}