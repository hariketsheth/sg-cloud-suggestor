# Define the provider for the on-premise infrastructure
provider "sgcp-gen2" {
  # Configuration for on-premise provider if needed
}

# Define the on-premise compute instance: large-mem32 (4 vCPU, 32 GB Memory, RHEL)
resource "local_file" "on_prem_compute_instance" {
  filename = "on_prem_compute_instance.tf"
  content = <<EOF
resource "null_resource" "on_prem_instance" {
  provisioner "local-exec" {
    command = "echo 'Creating on-premise instance: large-mem32 with 4 vCPU and 32 GB Memory'"
  }
}
EOF
}

# Define the provider for AWS
provider "aws" {
  region = "eu-central-1" # This corresponds to the Frankfurt region
}

# Database Instance: db.m5.large (2 vCPUs, 8 GB Memory)
resource "aws_db_instance" "db_instance" {
  identifier          = "db-m5-large"
  instance_class      = "db.m5.large"
  engine              = "mysql" # Choose your database engine (mysql, postgres, etc.)
  allocated_storage    = 20  # Minimum storage required (adjust as necessary)
  username            = "admin"
  password            = "P@ssword123!"  # Use a secure password
  db_subnet_group_name = "your-db-subnet-group"  # Specify your DB subnet group
  vpc_security_group_ids = ["sg-12345678"] # Replace with your security group ID

  # Reserved instance purchase option is managed through the AWS console, not in Terraform
  skip_final_snapshot = true

  tags = {
    Name = "db.m5.large-instance"
  }
}

# Output the instance details
output "on_prem_compute_instance" {
  value = local_file.on_prem_compute_instance.filename
}

output "db_instance_identifier" {
  value = aws_db_instance.db_instance.identifier
}
