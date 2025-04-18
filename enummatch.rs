enum Status {
    Success,
    Error,
}

fn check(status: Status) {
    match status {
        Status::Success => println!("Operation succeeded"),
        Status::Error => println!("Operation failed"),
    }
}

fn main() {
    let status = Status::Success;
    check(status);
}
