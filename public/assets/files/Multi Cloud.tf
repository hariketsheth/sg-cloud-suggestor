provider "azurerm" {
  features {}
}

# Define the resource group for compute and database
resource "azurerm_resource_group" "rg" {
  name     = "rg-cloud-migration"
  location = "West Europe"
}

# Compute Instance: Standard D4s v5 with RHEL, Reserved (1 year)
resource "azurerm_linux_virtual_machine" "compute_instance" {
  name                = "standard-d4s-v5-instance"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  size                = "Standard_D4s_v5"
  admin_username      = "adminuser"
  admin_password      = "P@ssw0rd123!"

  # OS configuration (RHEL)
  admin_ssh_key {
    username   = "adminuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Premium_LRS"
  }

  source_image_reference {
    publisher = "RedHat"
    offer     = "RHEL"
    sku       = "8_4"
    version   = "latest"
  }

  # Reserved instance configuration (Use reserved plans if needed)
  plan {
    name      = "rhel"
    publisher = "RedHat"
    product   = "RedHat"
  }
}

# Storage Instance (Database): Standard D2s v5, Reserved (1 year)
resource "azurerm_postgresql_flexible_server" "database_instance" {
  name                = "standard-d2s-v5-db"
  resource_group_name = azurerm_resource_group.rg.name
  location            = "North Europe"
  sku_name            = "Standard_D2s_v5"
  version             = "12"
  storage_mb          = 32768  # Adjust as per requirement (32 GB)
  administrator_login = "dbadmin"
  administrator_password = "P@ssw0rd123!"

  # Configure high availability and backup if needed
  high_availability {
    mode = "ZoneRedundant"
  }

  backup {
    retention_days = 7
  }

  # Reserved instance plan (if applicable)
  plan {
    name      = "reserved"
    publisher = "Microsoft"
    product   = "SQL"
  }
}

# Output the public IP of the compute instance
output "compute_instance_public_ip" {
  value = azurerm_linux_virtual_machine.compute_instance.public_ip_address
}

# Output the PostgreSQL server name
output "database_instance_name" {
  value = azurerm_postgresql_flexible_server.database_instance.name
}
