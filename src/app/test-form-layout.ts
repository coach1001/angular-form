export const ReactiveLayoutTest = {
    screens: [
        {
            type: 'STEP',
            name: 'test',
            elements: [
                {
                    type: 'CONTROL',
                    name: 'input'
                },
                {
                    type: 'OBJECT',
                    name: 'testObject',
                    reactivity: [
                        { type: 'clearWhen', expression: "input != 'show'"},
                        { type: 'visibleWhen', expression: "input == 'show'"}
                    ],
                    elements: [
                        {
                            type: 'CONTROL',
                            name: 'testObjectInput'
                        },
                        {
                            type: 'ARRAY',
                            name: 'testObjectArray',
                            elements: [
                                {
                                    type: 'CONTROL',
                                    name: 'testObjectArrayInput',
                                    validations: [
                                        { type: 'required' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /*{
                    type: 'ARRAY',
                    name: 'testArray',
                    reactivity: [
                        { type: 'clearWhen', expression: "input != 'show'"},
                        { type: 'visibleWhen', expression: "input == 'show'"}
                    ],
                    elements: [
                        {
                            type: 'ARRAY',
                            name: 'testArrayArray',
                            elements: [
                                {
                                    type: 'CONTROL',
                                    name: 'testArrayArrayInput',
                                }
                            ]
                        },
                        {
                            type: 'CONTROL',
                            name: 'testArrayInput',
                        }
                    ]
                }*/
            ]
        }
    ]
};

export const ReactiveLayoutTestValue = [];

export const NestedScreenLayoutValue = [
    {
        personal: {
            firstName: 'Francois',
            surname: 'Weber',
            age: 20
        },
        occupation: {
            currentEmployer: 'Tangent IT Solutions',
            address: 'The Campus, 57 Sloane Street, Carisbrook Building, Bryanston, 2194',
            employmentHistory: [
                { previousEmployer: 'Foundation for Human Rights', from: 2011, till: 2011 }
            ]
        }
    }
];

export const NestedScreenLayout = {
    screens: [
        {
            type: 'STEP',
            name: 'information',
            layout: {},
            elements: [
                {
                    type: 'OBJECT',
                    name: 'personal',
                    layout: {},
                    validations: [
                        { type: 'requiredIf', controlName: 'gender', expression: 'age > 20' }
                    ],
                    elements: [
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'firstName',
                            layout: {},
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'surname',
                            layout: {},
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'age',
                            numbersOnly: true,
                            hint: 'Any age above 20 and gender will be required.',
                            layout: {},
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            type: 'CONTROL',
                            subType: 'RADIO_GROUP_INPUT',
                            name: 'gender',
                            layout: {},
                            defaultValue: 'M',
                            reactivity: [
                                { type: 'clearWhen', expression: 'age < 21' },
                                // { type: 'disableWhen', expression: 'age < 21' },
                                { type: 'visibleWhen', expression: 'age > 20' }
                            ],
                            options: [
                                { key: 'M', value: 'Male' },
                                { key: 'F', value: 'Female' }
                            ],
                        }
                    ]
                },
                {
                    type: 'OBJECT',
                    name: 'occupation',
                    layout: {},
                    elements: [
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'currentEmployer',
                            layout: {},
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'address',
                            layout: {},
                            validations: [
                                { type: 'required' }
                            ]
                        },
                        {
                            type: 'ARRAY',
                            name: 'employmentHistory',
                            layout: {},
                            validations: [
                                { type: 'mustMatch', value: ['from', 'till'] }
                            ],
                            elements: [
                                {
                                    type: 'CONTROL',
                                    subType: 'TEXT_INPUT',
                                    name: 'previousEmployer',
                                    layout: {},
                                    validations: [
                                        { type: 'required' }
                                    ]
                                },
                                {
                                    type: 'CONTROL',
                                    subType: 'TEXT_INPUT',
                                    name: 'from',
                                    numbersOnly: true,
                                    layout: {},
                                    validations: [
                                        { type: 'required' }
                                    ]
                                },
                                {
                                    type: 'CONTROL',
                                    subType: 'TEXT_INPUT',
                                    name: 'till',
                                    numbersOnly: true,
                                    layout: {},
                                    validations: [
                                        { type: 'required' }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export const ScreenValue = [
    {
        firstName: 'Francois',
        surname: 'Weber',
        emailAddress: 'coach1001@gmail.com',
        age: 36
    },
    {
        bank: 'Capitec'
    }
]
export const MultiScreenLayout = {
    screens: [
        {
            type: 'STEP',
            name: 'personalDetails',
            layout: { large: 'row wrap', small: 'column' },
            gap: { large: '32px grid', small: '24px grid' },
            validations: [
                { type: 'mustMatch', value: ['password', 'confirmPassword'] }
            ],
            elements: [
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    name: 'firstName',
                    layout: { large: '50', small: '100' },
                    defaultValue: 'Francois',
                    validations: [
                        { type: 'required' }
                    ]
                },
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    name: 'surname',
                    layout: { large: '50', small: '100' },
                    validations: [
                        { type: 'required' }
                    ]
                },
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    name: 'emailAddress',
                    layout: { large: '50', small: '100' },
                    inputType: 'email',
                    validations: [
                        { type: 'required' },
                        { type: 'email' }
                    ]
                },
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    name: 'password',
                    layout: { large: '50', small: '100' },
                    inputType: 'password',
                    validations: [
                        { type: 'required' }
                    ]
                },
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    name: 'confirmPassword',
                    layout: { large: '50', small: '100' },
                    inputType: 'password',
                    hint: 'Re-type password',
                    validations: [
                        { type: 'required' }
                    ]
                },
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    name: 'age',
                    layout: { large: '50', small: '100' },
                    numbersOnly: true,
                    validations: [
                        { type: 'required' },
                        { type: 'min', value: 18 },
                        { type: 'max', value: 80 }
                    ]
                },
                {
                    type: 'CONTROL',
                    subType: 'BOOLEAN_INPUT',
                    name: 'providentFund',
                    layout: { large: '100', small: '100' },
                    label: 'Do you have a provident fund?',
                    defaultValue: false,
                    validations: [
                        { type: 'required' }
                    ],
                    visibleWhen: {
                        expression: "age >= 35 && age <= 60"
                    },
                    clearWhen: {
                        expression: "age < 35 || age > 60"
                    }
                }
            ]
        },
        {
            type: 'STEP',
            name: 'financialDetails',
            layout: { large: 'row wrap', small: 'column' },
            gap: { large: '32px grid', small: '24px grid' },
            elements: [
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    name: 'bank',
                    layout: { large: '50', small: '100' },
                    validations: [
                        { type: 'required' }
                    ]
                },
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    name: 'accountNumber',
                    numbersOnly: true,
                    layout: { large: '50', small: '100' },
                    validations: [
                        { type: 'required' }
                    ]
                }
            ]
        }
    ]
};
export const FamilyValue = {
    totalIndividuals: 4,
    testBoolean: true,
    testObject: {
        innerObject: {
            innerObjectText: 'Nicely done!'
        },
        innerArray: [
            {
                innerArrayText: 'Nice done again!'
            }
        ]
    },
    fatherDetails: {
        firstName: 'Francois',
        surname: 'Weber',
    },
    motherDetails: {
        firstName: 'Leanne',
        surname: 'Weber',
        maidenName: 'Mulder'
    },
    hasChildren: true,
    children: [
        { firstName: 'Dailen', gender: 'M' },
        { firstName: 'Isabellla', gender: 'F' }
    ]
}
export const FamilyLayout = {
    screens: [
        {
            type: 'STEP',
            name: 'familyDetails',
            label: 'Family details',
            elements: [
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    name: 'totalIndividuals',
                    label: 'Total individuals',
                },
                {
                    type: 'CONTROL',
                    subType: 'BOOLEAN_INPUT',
                    name: 'testBoolean',
                    label: 'Just a test for reactivity?'
                },
                {
                    type: 'OBJECT',
                    name: 'testObject',
                    visibleWhen: {
                        expression: "testBoolean"
                    },
                    clearWhen: {
                        expression: "!testBoolean"
                    },
                    elements: [
                        {
                            type: 'OBJECT',
                            name: 'innerObject',
                            elements: [
                                {
                                    type: 'CONTROL',
                                    subType: 'TEXT_INPUT',
                                    name: 'innerObjectText'
                                }
                            ]
                        },
                        {
                            type: 'ARRAY',
                            name: 'innerArray',
                            elements: [
                                {
                                    type: 'CONTROL',
                                    subType: 'TEXT_INPUT',
                                    name: 'innerArrayText'
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'OBJECT',
                    name: 'fatherDetails',
                    label: 'Family details',
                    elements: [
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'firstName',
                            label: 'First name'
                        },
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'surname',
                            label: 'Surname'
                        }
                    ]
                },
                {
                    type: 'OBJECT',
                    name: 'motherDetails',
                    label: 'Mother details',
                    elements: [
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'firstName',
                            label: 'First name'
                        },
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'surname',
                            label: 'Surname'
                        },
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'maidenName',
                            label: 'Maiden name'
                        }
                    ]
                },
                {
                    type: 'CONTROL',
                    subType: 'BOOLEAN_INPUT',
                    name: 'hasChildren',
                    label: 'Are there any children?'
                },
                {
                    type: 'ARRAY',
                    name: 'children',
                    label: 'Children',
                    visibleWhen: {
                        expression: "hasChildren"
                    },
                    clearWhen: {
                        expression: "!hasChildren"
                    },
                    elements: [
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'firstName',
                            label: 'First name'
                        },
                        {
                            type: 'CONTROL',
                            subType: 'RADIO_GROUP_INPUT',
                            name: 'gender',
                            label: 'Gender',
                            options: [
                                { key: 'M', value: 'Male' },
                                { key: 'F', value: 'Female' }
                            ]
                        },
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'hairColor',
                            label: 'Hair color',
                            visibleWhen: {
                                expression: "gender == 'M'"
                            },
                            clearWhen: {
                                expression: "gender != 'M'"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
export const Value = {
    step1_array1: [
        {
            step1_array1_input1: 'step1_array1_input1_index0_value'
        }
    ],
    step1_input1: 'step1_input1_value',
    step1_object1: {
        step1_object1_object1: {
            step1_object1_object1_input1: 'step1_object1_object1_input1_value'
        },
        step1_object1_input1: 'step1_object1_input1_value',
        step1_object1_array1: [
            {
                step1_object1_array1_input1: 'step1_object1_array1_input1_index0_value'
            },
            {
                step1_object1_array1_input1: 'step1_object1_array1_input1_index1_value'
            }
        ]
    },
    step1_array2: [
        {
            step1_array2_object1: {
                step1_array2_object1_input1: 'step1_array1_object1_index0_input1_value'
            },
            step1_array2_input1: 'step1_array1_input1_index0_value'
        }
    ],
    step1_array3: [
        {
            step1_array3_array1: [
                {
                    step1_array3_array1_input1: 'step1_array3_index0_array1_index0_input1_value'
                },
                {
                    step1_array3_array1_input1: 'step1_array3_index0_array1_index1_input1_value'
                }
            ]
        },
        {
            step1_array3_array1: [
                {
                    step1_array3_array1_input1: 'step1_array3_index1_array1_index0_input1_value'
                }
            ]
        }
    ]
}
export const Layout = {
    screens: [
        {
            type: 'OBJECT',
            subType: 'PARENT',
            name: 'step1',
            elements: [
                {
                    type: 'ARRAY',
                    name: 'step1_array1',
                    elements: [
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'step1_array1_input1'
                        }
                    ]
                },
                {
                    type: 'CONTROL',
                    subType: 'TEXT_INPUT',
                    name: 'step1_input1'
                },
                {
                    type: 'OBJECT',
                    name: 'step1_object1',
                    elements: [
                        {
                            type: 'OBJECT',
                            name: 'step1_object1_object1',
                            elements: [
                                {
                                    type: 'CONTROL',
                                    subType: 'TEXT_INPUT',
                                    name: 'step1_object1_object1_input1'
                                }
                            ]
                        },
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'step1_object1_input1'
                        },
                        {
                            type: 'ARRAY',
                            name: 'step1_object1_array1',
                            elements: [
                                {
                                    type: 'CONTROL',
                                    subType: 'TEXT_INPUT',
                                    name: 'step1_object1_array1_input1'
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'ARRAY',
                    name: 'step1_array2',
                    elements: [
                        {
                            type: 'OBJECT',
                            name: 'step1_array2_object1',
                            elements: [
                                {
                                    type: 'CONTROL',
                                    subType: 'TEXT_INPUT',
                                    name: 'step1_array2_object1_input1'
                                }
                            ]
                        },
                        {
                            type: 'CONTROL',
                            subType: 'TEXT_INPUT',
                            name: 'step1_array2_input1'
                        }
                    ]
                },
                {
                    type: 'ARRAY',
                    name: 'step1_array3',
                    elements: [
                        {
                            type: 'ARRAY',
                            name: 'step1_array3_array1',
                            elements: [
                                {
                                    type: 'CONTROL',
                                    subType: 'TEXT_INPUT',
                                    name: 'step1_array3_array1_input1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}