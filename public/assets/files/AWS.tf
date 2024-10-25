provider "aws" {
  region = "eu-west-1" # EU (Ireland) region for the compute instance
}

# Compute Instance: r6i.xlarge with RHEL, Reserved (1 year)
resource "aws_instance" "compute_instance" {
  ami             = "ami-0c55b159cbfafe1f0"  # Replace with the AMI ID for RHEL
  instance_type   = "r6i.xlarge"
  key_name        = "your-key-pair"  # Replace with your SSH key pair
  subnet_id       = "subnet-12345abcde"  # Replace with a valid subnet ID
  availability_zone = "eu-west-1a"

  # Reserved instance purchase option
  tenancy = "default"

  tags = {
    Name = "r6i-xlarge-instance"
  }
}

# Storage Instance (Database): db.m5.large, Reserved (1 year)
resource "aws_db_instance" "database_instance" {
  identifier              = "db-m5-large-instance"
  instance_class          = "db.m5.large"
  engine                  = "postgres"
  engine_version          = "12.6"  # Adjust based on preferred version
  allocated_storage       = 20  # Adjust as needed (20 GB)
  storage_type            = "gp2"
  username                = "dbadmin"
  password                = "P@ssw0rd123!"  # Replace with a secure password
  publicly_accessible     = false
  multi_az                = false
  availability_zone       = "eu-central-1a"  # EU (Frankfurt) for storage

  # Reserved instance purchase option
  license_model = "bring-your-own-license"

  tags = {
    Name = "db-m5-large-instance"
  }
}

# Output the instance ID and database endpoint
output "compute_instance_id" {
  value = aws_instance.compute_instance.id
}

output "database_instance_endpoint" {
  value = aws_db_instance.database_instance.endpoint
}
