describe('Hello world spec', function() {
  it('mounts a hello tag', function() {
    var html = document.createElement('hello')
    document.body.appendChild(html)
    tag = riot.mount('hello')[0]
    expect(tag).to.exist
    expect(tag.isMounted).to.be.true    
  })
  
  it('has a name property ', function() {
    var html = document.createElement('hello')
    document.body.appendChild(html)
    tag = riot.mount('hello')[0]
    expect(tag.name).to.exist
  })  
})
