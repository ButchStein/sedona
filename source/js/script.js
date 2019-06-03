function CustomValidation(input) {
	this.invalidities = [];
	this.validityChecks = [];

	//add reference to the input node
	this.inputNode = input;

	//trigger method to attach the listener
	this.registerListener();
}

CustomValidation.prototype = {
	addInvalidity: function (message) {
		this.invalidities.push(message);
	},
	getInvalidities: function () {
		return this.invalidities.join('. \n');
	},
	checkValidity: function (input) {
		for (var i = 0; i < this.validityChecks.length; i++) {

			var isInvalid = this.validityChecks[i].isInvalid(input);
			if (isInvalid) {
				this.addInvalidity(this.validityChecks[i].invalidityMessage);
			}

			var requirementElement = this.validityChecks[i].element;

			if (requirementElement) {
				if (isInvalid) {
					requirementElement.classList.add('invalid');
					requirementElement.classList.remove('valid');
				} else {
					requirementElement.classList.remove('invalid');
					requirementElement.classList.add('valid');
				}

			} // end if requirementElement
		} // end for
	},
	checkInput: function () { // checkInput now encapsulated

		this.inputNode.CustomValidation.invalidities = [];
		this.checkValidity(this.inputNode);

		if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
			this.inputNode.setCustomValidity('');
		} else {
			var message = this.inputNode.CustomValidation.getInvalidities();
			this.inputNode.setCustomValidity(message);
		}
	},
	registerListener: function () { //register the listener here

		var CustomValidation = this;

		this.inputNode.addEventListener('keyup', function () {
			CustomValidation.checkInput();
		});


	}

};

var nameValidityChecks = [
	{
		isInvalid: function (input) {
			return input.value.length < 1;
		},
		invalidityMessage: 'Это поле обязательно к заполнению',
		element: document.querySelector('label[for="name"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function (input) {
			let illegalCharacters = input.value.match(/[a-zA-Z]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Использование специальных символов и цифр недопустимо',
		element: document.querySelector('label[for="name"] .input-requirements li:nth-child(2)')
	}
];
var surnameValidityChecks = [
	{
		isInvalid: function (input) {
			return input.value.length < 1;
		},
		invalidityMessage: 'Это поле обязательно к заполнению',
		element: document.querySelector('label[for="surname"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function (input) {
			let illegalCharacters = input.value.match(/[^a-zA-Z]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Использование специальных символов и цифр недопустимо',
		element: document.querySelector('label[for="surname"] .input-requirements li:nth-child(2)')
	}
];
var fatherNameValidityChecks = [
	{
		isInvalid: function (input) {
			return input.value.length < 1;
		},
		invalidityMessage: 'Это поле обязательно к заполнению',
		element: document.querySelector('label[for="father_name"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function (input) {
			let illegalCharacters = input.value.match(/[^a-zA-Z]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Использование специальных символов и цифр недопустимо',
		element: document.querySelector('label[for="father_name"] .input-requirements li:nth-child(2)')
	}
];

var nameInput = document.getElementById('name');
var surnameInput = document.getElementById('surname');
var fatherNameInput = document.getElementById('father_name');

nameInput.CustomValidation = new CustomValidation(nameInput);
nameInput.CustomValidation.validityChecks = nameValidityChecks;

surnameInput.CustomValidation = new CustomValidation(surnameInput);
surnameInput.CustomValidation.validityChecks = surnameValidityChecks;

fatherNameInput.CustomValidation = new CustomValidation(fatherNameInput);
fatherNameInput.CustomValidation.validityChecks = fatherNameValidityChecks;

var inputs = document.querySelectorAll('input[type="text"]');
var submit = document.querySelector('button[type="submit"]');
var form = document.getElementById('feedback');

function validate() {
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].CustomValidation.checkInput();
		console.log(inputs[i]);
	}
}

submit.addEventListener('click', validate);
form.addEventListener('submit', validate);