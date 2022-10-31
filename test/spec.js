const { expect } = require('chai');
const { seed } = require('../db/seed');
const jwt = require('jsonwebtoken');
const { Distillery, Whiskey, User, Tasting } = require('../db/associations');
const app = require('supertest')(require('../server/app'));

try {
	require('../secrets');
} catch (ex) {
	console.log(
		'if running locally add secrets.js file which sets environment variables for JWT'
	);
}

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
			eli.email = 'newEli@gmail.com';
			await eli.save();
			expect(password).to.equal(eli.password);
		});
	});

	describe('Token exchange', () => {
		describe('A valid token', () => {
			it('Can be exchanged for the user', async () => {
				const token = jwt.sign({ id: seededData.eli.id }, process.env.JWT);
				const eli = await User.findByToken(token);
				expect(eli.email).to.equal('ecohen3@wellesley.edu');
			});
		});

		describe('With no matching user', () => {
			it('Will throw an error', async () => {
				const token = jwt.sign({ id: seededData.eli.id }, process.env.JWT);
				await seededData.eli.destroy();
				try {
					const eli = await User.findByToken(token);
				} catch (err) {
					expect(err.status).to.equal(401);
				}
			});
		});

		describe('An invalid token', () => {
			it('Cannot be exchanged for the user', async () => {
				const token = jwt.sign(
					{ id: seededData.eli.id },
					`${process.env.JWT}!`
				);
				try {
					const eli = await User.findByToken(token);
				} catch (err) {
					expect(err.status).to.equal(401);
				}
			});
		});
	});

	describe('API routes', () => {
		describe('POST /api/auth', () => {
			describe('With valid credentials', () => {
				it('Returns a token', async () => {
					const response = await await app
						.post('/api/auth')
						.send({ email: 'ecohen3@wellesley.edu', password: 'monkey' });

					expect(response.status).to.equal(200);
				});
			});
		});

		describe('GET /api/auth', () => {
			describe('With a valid token', () => {
				it('Returns the user', async () => {
					const token = jwt.sign({ id: seededData.eli.id }, process.env.JWT);

					const response = await await app
						.get('/api/auth')
						.set('authorization', token);

					expect(response.status).to.equal(200);
					expect(response.body.email).to.equal('ecohen3@wellesley.edu');
				});
			});
		});
	});
});

describe('Logging tastings', () => {
	let seededData;

	beforeEach(async () => {
		seededData = await seed();
	});

	describe("Getting a user's tastings", () => {
		describe('If the user has tastings logged', () => {
			it("Returns the user's tastings", async () => {
				const tastings = await seededData.eli.getTastings();
				expect(tastings.length).to.equal(1);
			});
		});

		describe('If the user has no tastings logged', () => {
			it('Returns an empty array of tastings', async () => {
				const chelsea = await User.create({
					email: 'cskone@wellesley.edu',
					password: 'monkey2',
					firstName: 'Chelsea',
					lastName: 'Cohen',
				});
				const tastings = await chelsea.getTastings();
				expect(tastings.length).to.equal(0);
			});
		});
	});

	describe('Creating a tasting', () => {
		it('Adds a tasting', () => {});
	});
});
