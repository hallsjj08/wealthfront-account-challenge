require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save user without username" do
    user = User.new(password: 'This#is@Str0ngP@Ssw0rd')
    assert_not user.save
  end

  test "should not save user without password" do
    user = User.new(username: '123456789')
    assert_not user.save
  end

  test "should save user" do
    user = User.new(username: '1234567890', password: 'This#is@Str0ngP@Ssw0rd')
    assert user.save
  end

  test "should validate username" do
    @user = User.new(password: 'This#is@Str0ngP@Ssw0rd')

    @user['username'] = '123456789'
    assert_not @user.valid?, "< 10"

    @user['username'] = '1234567890'
    assert @user.valid?, ">= 10"

    @user['username'] = '12345678901234567890123456789012345678901234567890'
    assert @user.valid?, "<= 50"

    @user['username'] = '123456789012345678901234567890123456789012345678901'
    assert_not @user.valid?, "> 50"
  end

  test "should validate password" do
    @user = User.new(username: '1234567890')

    @user['password'] = 'This#is@Str0ngP@Ssw'
    assert_not @user.valid?, "< 20"

    @user['password'] = 'This#is@Str0ngP@Ssw0'
    assert @user.valid?, ">= 20"

    @user['password'] = 'This#is@Str0ngP@Ssw0rd3456789012345678901234567890'
    assert @user.valid?, "<= 50"

    @user['password'] = 'This#is@Str0ngP@Ssw0rd34567890123456789012345678901'
    assert_not @user.valid?, "> 50"

    @user['password'] = 'passwordpassword1234'
    assert_not @user.valid?, 'weak password'
  end
end
