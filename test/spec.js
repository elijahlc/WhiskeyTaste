const { expect } = require('chai');
const { seed } = require('../db/seed');
const { Distillery, Whiskey, User, Tasting } = require('../db/associations');
const app = require('supertest')(require('../server/app'));

describe('Authentication', () => {
	let seededData;

	beforeEach(async () => {
		seededData = await seed();
	});

	describe('Password storage', () => {
		it('Password is hashed', () => {
			expect(seededData.eli.password).not.to.equal('monkey');
		});

		it('Does not get rehashed when a user updates', async () => {
			const { eli } = seededData;
			const password = eli.password;
			eli.username = 'newEli';
			await eli.save();
			expect(password).to.equal(eli.password);
		});
	});
});
