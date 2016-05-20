import Ember from 'ember';

export default Ember.Controller.extend({
    contactEmail: '',
    message: '',

    isValidEmail: Ember.computed.match('contactEmail', /^.+@.+\..+$/),
    isMessageEnoughLong: Ember.computed.gte('message.length', 5),

    isValid: Ember.computed.and('isValidEmail', 'isMessageEnoughLong'),
    isNotValid: Ember.computed.not('isValid'),

    actions: {
        saveContact() {
            const email = this.get('contactEmail');
            const message = this.get('message');
            const newContact = this.store.createRecord('contact', {email: email, message: message});
            newContact.save().then(()=> {
               console.log('123');
            });
        },
        willTransition() {
            this.controller.get('model').rollbackAttributes();
        }
    }
});
