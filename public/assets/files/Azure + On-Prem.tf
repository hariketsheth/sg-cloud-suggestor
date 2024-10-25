# Terraform provider for managing on-prem resources (using null_resource as placeholder)
provider "null" {}

# Define the on-premise Compute Instance: large-mem32 (4 vCPU, 32 GB, RHEL)
resource "null_resource" "on_prem_compute_instance" {
  provisioner "local-exec" {
    command = <<EOT
      echo "Creating on-premise compute instance: large-mem32 with 4 vCPU and 32 GB Memory in eu-fr-paris-2"
      # Add command to create the compute instance here (e.g., using an API or CLI)
    EOT
  }
}

# Output for on-premise compute instance
output "on_prem_compute_info" {
  value = "On-Premise instance large-mem32 with 4 vCPU and 32 GB Memory created."
}

# Define the on-premise Database Instance: Postgres-OCS-2vCPU-8GB (2 vCPU, 8 GB, SQL Database)
resource "null_resource" "on_prem_database_instance" {
  provisioner "local-exec" {
    command = <<EOT
      echo "Creating on-premise database instance: Postgres-OCS with 2 vCPU and 8 GB Memory in aur-fr-north-1"
      # Add command to create the database instance here (e.g., using an API or CLI)
    EOT
  }
}

# Output for on-premise database instance
output "on_prem_database_info" {
  value = "On-Premise database instance Postgres-OCS with 2 vCPU and 8 GB Memory created."
}
