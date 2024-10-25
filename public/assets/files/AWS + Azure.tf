# AWS Provider Setup
provider "aws" {
  region = "eu-west-1" # Ireland
}

# Compute Instance: r6g.xlarge with RHEL, Reserved (1 year)
resource "aws_instance" "compute_instance" {
  ami             = "ami-0c55b159cbfafe1f0"  # Replace with the correct RHEL AMI for eu-west-1
  instance_type   = "r6g.xlarge"
  key_name        = "your-key-pair"  # Replace with your AWS SSH key pair
  subnet_id       = "subnet-12345abcde"  # Replace with a valid subnet ID
  availability_zone = "eu-west-1a"

  # Reserved instance purchase option
  tenancy = "default"

  tags = {
    Name = "r6g-xlarge-instance"
  }
}

# Azure Provider Setup
provider "azurerm" {
  features {}
}

# SQL Database: Standard_B2ms in West Europe
resource "azurerm_sql_server" "sql_server" {
  name                         = "sqlserverexample123"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = "West Europe"
  version                      = "12.0"
  administrator_login          = "sqladminuser"
  administrator_login_password = "P@ssw0rd123!"  # Replace with a secure password

  tags = {
    environment = "Production"
  }
}

resource "azurerm_sql_database" "sql_database" {
  name                = "exampledatabase"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_sql_server.sql_server.location
  server_name         = azurerm_sql_server.sql_server.name
  sku_name            = "BC_Gen5_2"  # Use Business Critical for higher performance
  max_size_gb         = 10

  tags = {
    environment = "Production"
  }
}

resource "azurerm_resource_group" "rg" {
  name     = "example-resources"
  location = "West Europe"
}

# Output the instance ID and SQL server name
output "compute_instance_id" {
  value = aws_instance.compute_instance.id
}

output "sql_server_name" {
  value = azurerm_sql_server.sql_server.name
}

output "sql_database_name" {
  value = azurerm_sql_database.sql_database.name
}
