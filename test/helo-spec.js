describe('Hello world spec', function() {
  it('exists a hello tag', function() {
    var html = document.createElement('hello')
    document.body.appendChild(html)
    tag = riot.mount('hello')[0]
    expect(tag).to.be.ok
  })
})
