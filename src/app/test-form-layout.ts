export const FamilyValue = {
    totalIndividuals: 4,
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
        { firstName: 'Dailen' }
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
                    type: 'OBJECT',
                    subType: 'TEXT_INPUT',
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
                                { key: 'F', value: 'Female'}
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
        }
    ]
}

export const Layout = {
    screens: [
        {
            type: 'STEP',
            subType: 'PARENT',
            name: 'step1',
            elements: [
                {
                    type: 'ARRAY',
                    name: 'step1_array1',
                    elements: [
                        {
                            type: 'CONTROL',
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