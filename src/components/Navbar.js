import Modal from "./Modal"

const Navbar = (props) => {
    const findSum = (data) => {
        let summary = 0

        for (let item of data) {
            summary += item.price
        }

        return summary
    }
    return (
        <nav class="navbar navbar-light bg-light fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Save your time</a>
                <button class="navbar-toggler position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                    <span style={{fontSize: "10px"}} class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {props.products.length}
                        <span class="visually-hidden">products</span>
                    </span>
                </button>
                <div class="offcanvas offcanvas-end " tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Basket</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <div class="list-group">
                            {props.products.map(product =>                                
                                <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">{product.name}</h5>
                                        <button type="button" onClick={() => {
                                            props.setProducts(props.products.filter(item => item != product))
                                        }} class="btn-close"></button>
                                    </div>
                                    <small>{product.price}$</small>
                                </a>                    
                            )}
                        </div>
                        <form className="d-flex" style={{paddingTop: "20px"}}>
                            <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" class="btn btn-outline-dark">
                                {findSum(props.products)}$
                            </button>
                            <Modal/>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar