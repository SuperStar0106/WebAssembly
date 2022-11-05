require "test-unit"
require "js"

class JS::TestError < Test::Unit::TestCase
  def test_throw_error
    e = assert_raise(JS::Error) do
      JS.eval("throw new Error('foo')")
    end
    assert_match /^Error: foo/, e.message
    assert_equal "#<JS::Error: Error: foo>", e.inspect
  end

  def test_throw_non_error
    e = assert_raise(JS::Error) do
      JS.eval("throw 'foo'")
    end
    assert_equal "foo", e.message
    assert_equal "#<JS::Error: foo>", e.inspect
  end
end
