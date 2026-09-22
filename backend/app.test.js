// Jenkins trigger practiceimport request from 'supertest'
import request from 'supertest'
import app from './app.js'

test('GET / should return API WORKING', async() => {
    const response = await request(app).get('/')

    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('API WORKING')
})