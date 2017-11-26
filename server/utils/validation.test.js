let expect = require('expect');
let {isRealString} = require('./validation');

describe('isRealString', () =>{

    it('should reject non-string values', ()=>{
        let str = 123456;
        let string = isRealString(str);
        
        expect(string).toBe(false);  
    });
    
    it('should reject string with only space', () =>{
       let str ='       ';
        let string = isRealString(str);
        
        expect(string).toBe(false);
    });
    
    it('should allow string with non space characters', () =>{
       let str ='  Tom Smith  ';
        let string = isRealString(str);
        
        expect(string).toBe(true);
    });
    
    
});

