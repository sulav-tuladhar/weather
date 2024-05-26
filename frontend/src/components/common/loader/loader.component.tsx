import { MagnifyingGlass } from 'react-loader-spinner'

function Loadercomponent() {
    return (
        <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#fff"
        />
    )
}

export default Loadercomponent
