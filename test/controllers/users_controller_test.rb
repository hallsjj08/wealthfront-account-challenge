class UsersControllerTest < ActionDispatch::IntegrationTest
  test "password_strength" do
    post '/', params: { password: '123' }
    assert_response :success
    assert_equal response.body, "{\"score\":0}"
  end

  test "create_account fails with missing username" do
    post '/api/create-account', params: { user: { password: '1234567890123456789a' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['error']['messages'][0], "param is missing or the value is empty: username"
  end

  test "create_account fails with missing password" do
    post '/api/create-account', params: { user: { username: '1234567890' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['error']['messages'][0], "param is missing or the value is empty: password"
  end

  test "create_account fails with username length too short" do
    post '/api/create-account', params: {user: { username: '123456789', password: '1234567890123456789a' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['error']['messages'][0], "param must be at least 10 characters in length: username"
  end

  test "create_account fails with password length too short" do
    post '/api/create-account', params: { user: { username: '1234567890', password: '1234567890123456789' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['error']['messages'][0], "param must be at least 20 characters in length: password"
  end

  test "create_account fails with username length too long" do
    post '/api/create-account', params: {user: { username: '123456789012345678901234567890123456789012345678901', password: '1234567890123456789a' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['error']['messages'][0], "param must be less than or equal to 50 characters in length: username"
  end

  test "create_account fails with password length too long" do
    post '/api/create-account', params: { user: { username: '1234567890', password: '123456789012345678901234567890123456789012345678901' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['error']['messages'][0], "param must be less than or equal to 50 characters in length: password"
  end

  test "create_account fails with password must contain one character and one number" do
    post '/api/create-account', params: { user: { username: '1234567890', password: '12345678901234567890' }}
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['error']['messages'][0], "param must contain one character and one number: password"
  end

  test "create_account succeeds with valid username and password" do
    post '/api/create-account', params: {user: { username: '1234567890', password: 'This#is@Str0ngP@Ssw0rd' }}
    assert_response :success
    assert_equal JSON.parse(response.body)['success'], true
  end
end
