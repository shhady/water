import avatar from '../../assets/logos/avatar.jpg'

/**
 * A component that renders an avatar image. 
 * @param src - the source of the avatar image. 
 * @param size - the size of the avatar image. 
 * @param alt - the alt text of the avatar image. 
 * @returns A component that renders an avatar image. 
 */
export default function Avatar({ src,size,alt='תמונת משתמש' }) {
    return (
        <div className='userLogoWraper' style={size? {height:size}:{}}>
            <div className='userLogoMask'style={size? {height:size,width:size}:{}}/>
            <img className='userLogo' style={size? {height:size,bottom:size}:{}} src={src ? src : avatar} alt={alt} />
        </div>)
}
