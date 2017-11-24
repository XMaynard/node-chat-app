let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () =>{
    it('should generate correct message object', () =>{
       
        let from = 'Jen';
        let text = 'some message';
        let message = generateMessage(from, text);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () =>{
   it('should generate correct location object', () =>{
       let from = 'Bigo';
       let latitude = 12;
       let longitude = -97;
       let url = 'https://www.google.com/maps?q=12,-97'
       let location = generateLocationMessage(from,latitude, longitude);
       
       expect(location.createAt).toBeA('number');
       expect(location).toInclude({from, url});
       
   }); 
});