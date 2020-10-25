const generateUniqueId = require('../../src/app/utils/generateUniqueId')

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = generateUniqueId();
       
        expect(id).toHaveLength(8);
    })
})