export default function ClearLocalStorage(){
    const token = localStorage.getItem('token')!
    const email = localStorage.getItem('email')!
    const id = localStorage.getItem('id')!
    const profileImage = localStorage.getItem('profileImage')!
    const username = localStorage.getItem('username')!
    localStorage.clear()
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
    localStorage.setItem('id', id)
    localStorage.setItem('profileImage', profileImage)
    localStorage.setItem('username', username)
}