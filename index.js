const validateForm = (formSelector) => {
	const formElement = document.querySelector(formSelector);

	const validationOptions = [
		{
			attribute: 'minlength',
			isValid: (input) =>
				input.value && input.value.length >= parseInt(input.minLength, 10),
			errorMessage: (input, label) =>
				`${label.textContent} must be more than ${input.minLength} characters`,
		},
		{
			attribute: 'data-maxlength',
			isValid: (input) =>
				input.value &&
				input.value.length <=
					parseInt(input.getAttribute('data-maxLength'), 10),
			errorMessage: (input, label) =>
				`${label.textContent} must be less than ${input.getAttribute(
					'data-maxlength'
				)} characters`,
		},
		{
			attribute: 'pattern',
			isValid: (input) => {
				const emailPattern = new RegExp(input.pattern);
				return emailPattern.test(input.value);
			},
			errorMessage: () => `Looks like this is not an email`,
		},
		{
			attribute: 'required',
			isValid: (input) => input.value.trim() !== '',
			errorMessage: (input, label) => `${label.textContent} cannot be empty`,
		},
	];

	// select per form group
	const validateSingleFormGroup = (formGroup) => {
		const label = formGroup.querySelector('label');
		const input = formGroup.querySelector('input');
		const inputContainer = formGroup.querySelector('.input-container');
		const errorContainer = formGroup.querySelector('.error-message');
		const errorIcon = formGroup.querySelector('.error-icon');

		// on default, set error state to 'false'
		let formGroupError = false;
		// create variable 'Option' from list of available keys in the array validationOptions
		for (const option of validationOptions) {
			// check whether the input has attribute
			if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
				// sets error message as written in validationOptions
				errorContainer.textContent = option.errorMessage(input, label);
				// sets border to red and displays red error message below input container
				inputContainer.classList.add('error');
				// show error icon
				errorIcon.classList.remove('hidden');
				// ensures border isn't green
				inputContainer.classList.remove('success');
				// remove placeholder on error
				input.placeholder = '';
				formGroupError = true;
			}
		}

		// if error state is false
		if (!formGroupError) {
			// remove error message if user has inputted some text and submitted
			errorContainer.textContent = '';
			// sets border to green
			inputContainer.classList.add('success');
			// hide error icon
			errorIcon.classList.add('hidden');
			// removes error message
			inputContainer.classList.remove('error');
		}
	};

	// disable default HTML validation
	formElement.setAttribute('novalidate', '');

	// creates an array from all form inputs
	Array.from(formElement.elements).forEach((element) => {
		// listens if a focused element is out of focus
		element.addEventListener('blur', (e) => {
			// once the element is out of focus, validate it
			validateSingleFormGroup(e.srcElement.closest('.form-group'));
		});
	});

	// listens if user has submitted or not
	formElement.addEventListener('submit', (e) => {
		e.preventDefault();

		validateAllFormGroups(formElement);
	});

	// check for all inputs available with the class '.form-group'
	const validateAllFormGroups = (formToValidate) => {
		const formGroups = Array.from(
			formToValidate.querySelectorAll('.form-group')
		);

		// validate each one with that class
		formGroups.forEach((formGroup) => {
			validateSingleFormGroup(formGroup);
		});
	};
};

validateForm('#form');
