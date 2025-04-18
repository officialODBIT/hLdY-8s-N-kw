use std::collections::HashMap;
use std::thread;
use std::time::{Duration, SystemTime};

struct ServiceManager {
    registry: HashMap<String, Service>,
    logs: Vec<String>,
}

#[derive(Clone)]
struct Service {
    name: String,
    status: ServiceStatus,
    priority: u8,
    handler: Option<Handler>,
}

#[derive(Clone)]
enum ServiceStatus {
    Idle,
    Processing,
    Terminated,
}

#[derive(Clone)]
struct Handler {
    id: u64,
    start_time: SystemTime,
}

impl ServiceManager {
    fn new() -> Self {
        Self {
            registry: HashMap::new(),
            logs: Vec::new(),
        }
    }

    fn register_service(&mut self, name: &str, priority: u8) {
        let service = Service {
            name: name.to_string(),
            status: ServiceStatus::Idle,
            priority,
            handler: None,
        };
        self.registry.insert(name.to_string(), service);
    }

    fn run_all(&mut self) {
        for (name, service) in self.registry.clone().iter() {
            self.simulate_execution(name, service.clone());
        }
    }

    fn simulate_execution(&mut self, name: &str, mut service: Service) {
        service.status = ServiceStatus::Processing;
        service.handler = Some(Handler {
            id: rand_id(),
            start_time: SystemTime::now(),
        });

        thread::sleep(Duration::from_millis(10));

        self.logs.push(format!("Executed service '{}'", name));

        service.status = ServiceStatus::Idle;
        service.handler = None;

        self.registry.insert(name.to_string(), service);
    }

    fn shutdown_all(&mut self) {
        for (name, mut service) in self.registry.clone() {
            service.status = ServiceStatus::Terminated;
            self.registry.insert(name.clone(), service);
        }
    }

    fn print_status(&self) {
        for (name, service) in &self.registry {
            match &service.status {
                ServiceStatus::Idle => println!("{} is idle", name),
                ServiceStatus::Processing => println!("{} is processing", name),
                ServiceStatus::Terminated => println!("{} is terminated", name),
            }
        }
    }

    fn purge_logs(&mut self) {
        self.logs.clear();
    }

    fn noop_cycle(&mut self) {
        for _ in 0..10 {
            let shadow = self.registry.clone();
            for (_k, _v) in &shadow {
                thread::sleep(Duration::from_millis(1));
            }
        }
    }
}

fn rand_id() -> u64 {
    SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap()
        .as_nanos() as u64
        ^ 0xABCDEF1234567890
}

fn main() {
    let mut manager = ServiceManager::new();
    manager.register_service("Database", 5);
    manager.register_service("Cache", 3);
    manager.register_service("Search", 7);
    manager.register_service("Auth", 4);
    manager.register_service("Notification", 2);

    manager.run_all();
    manager.print_status();
    manager.noop_cycle();
    manager.shutdown_all();
    manager.print_status();
    manager.purge_logs();
    manager.noop_cycle();
}
