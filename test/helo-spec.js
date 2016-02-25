describe('Hello world spec', function() {

  before(function() {
    var html = document.createElement('hello')
    document.body.appendChild(html)
    tag = riot.mount('hello')[0]
  });

  it('mounts a hello tag', function() {
    expect(tag).to.exist
    expect(tag.isMounted).to.be.true
  })

  it('has a name property ', function() {
    expect(tag.name).to.exist
  })

  it('mounts a hello tag with a setted name', function() {
    tag = riot.mount('hello', {name: 'Carl'})[0]
    expect(tag.name).to.be.eq('Carl')
  })

  it('prints <h1>Hello {name}</h1> ', function() {
    tag = riot.mount('hello', {name: 'Carl'})[0]
    var tagText = document.querySelector('hello > h1').textContent
    expect(tagText).to.be.eq('Hello Carl')
  })

  it('transform name to uppercase', function() {
    tag = riot.mount('hello', {name: 'Carl'})[0]
    tag.uppercase()
    expect(tag.name).to.be.eq('CARL')
  })
})
