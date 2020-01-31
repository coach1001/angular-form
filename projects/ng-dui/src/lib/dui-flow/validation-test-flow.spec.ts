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
                    name: 'step1',
                    elementType: 0,
                    uiTemplate: 'defaultObject',
                    modelProperty: 'step1',
                    elements: [
                        {
                            name: 'password',
                            elementType: 2,
                            controlType: 0,
                            uiTemplate: 'defaultText',
                            modelProperty: 'password',
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            validators: [
                                {
                                    name: 'required',
                                    metadata: {
                                        required: true
                                    }
                                },
                                {
                                    name: 'minLength',
                                    metadata: {
                                        length: 3
                                    }
                                }
                            ],
                        },
                        {
                            name: 'confirmPassword',
                            elementType: 2,
                            controlType: 0,
                            uiTemplate: 'defaultText',
                            modelProperty: 'confirmPassword',
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            validators: [
                                {
                                    name: 'required',
                                    metadata: {
                                        required: true
                                    }
                                },
                                {
                                    name: 'mustMatch',
                                    objectScope: true,
                                    metadata: {
                                        targetField: 'password',
                                    }
                                }
                            ],

                        },
                        {
                            name: 'age',
                            elementType: 2,
                            controlType: 2,
                            uiTemplate: 'defaultNumber',
                            modelProperty: 'age',
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            validators: [
                                {
                                    name: 'required',
                                    metadata: {
                                        required: true
                                    }
                                }
                            ],
                        },
                        {
                            name: 'hasDiabetes',
                            elementType: 2,
                            controlType: 1,
                            uiTemplate: 'defaultBoolean',
                            modelProperty: 'hasDiabetes',
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            validators: [
                                {
                                    name: 'requiredIf',
                                    objectScope: true,
                                    metadata: {
                                        triggerField: 'age',
                                        triggerValue: '21',
                                    }
                                }
                            ],
                        },
                        {
                            name: 'medicalHistory',
                            elementType: 0,
                            uiTemplate: 'defaultObject',
                            modelProperty: 'medicalHistory',
                            layout: { stretchLarge: 50, stretchSmall: 100 },
                            validators: [
                                {
                                    name: 'requiredIf',
                                    objectScope: true,
                                    metadata: {
                                        triggerField: 'hasDiabetes',
                                        triggerValue: 'true',
                                    }
                                }
                            ],
                            elements: [
                                {
                                    name: 'desease',
                                    elementType: 2,
                                    controlType: 0,
                                    uiTemplate: 'defaultText',
                                    modelProperty: 'desease',
                                    layout: { stretchLarge: 50, stretchSmall: 100 },
                                }
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