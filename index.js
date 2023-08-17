const validateForm = (formSelector) => {
	const formElement = document.querySelector(formSelector);

	const validationOptions = [
		{
			attribute: 'required',
			isValid: (input) => input.value.trim() !== '',
			errorMessage: (input, label) => `${label.textContent} cannot be empty`,
		},
	];

	const validateSingleFormGroup = (formGroup) => {
		const label = formGroup.querySelector('label');
		const input = formGroup.querySelector('input');
		const inputContainer = formGroup.querySelector('.input-container');
		const errorContainer = formGroup.querySelector('.error-message');
		const errorIcon = formGroup.querySelector('.error-icon');

		// on default, set error state to 'false'
		let formGroupError = false;
		// create variable Option from list of available key in the array validationOptions
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

	formElement.setAttribute('novalidate', '');

	formElement.addEventListener('submit', (e) => {
		e.preventDefault();

		validateAllFormGroups(formElement);
	});

	const validateAllFormGroups = (formToValidate) => {
		const formGroups = Array.from(
			formToValidate.querySelectorAll('.form-group')
		);

		formGroups.forEach((formGroup) => {
			validateSingleFormGroup(formGroup);
		});
	};
};

validateForm('#form');

// let passwordRegex =
// 	/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{12,16}$/;

// function isValidEmail() {}

// function isValidPassword() {}

/*
1. check if password have any whitespace
2. check if there is at least one(1) uppercase letter
3. check if there is at least one(1) lowercase letter
4. check if there is at least one(1) digit
5. check if there is at least one(1) special symbol
6. check if password is at least 12 characters long
*/
