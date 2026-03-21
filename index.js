function counter() {
    let counter = 0
    return function increase_counter(){
        counter++
        console.log(counter)
    }
}

const fn = counter()
const fn1 = counter()
fn()
fn()
fn1()