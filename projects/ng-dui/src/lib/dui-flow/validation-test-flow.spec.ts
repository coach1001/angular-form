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
                                    metadata: {
                                        targetField: 'password',
                                        objectScope: true
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
                                    metadata: {
                                        triggerField: 'age',
                                        triggerValue: '21',
                                        objectScope: true
                                    }
                                }
                            ],
                        }
                    ]
                }
            ]
        }
    ]
}