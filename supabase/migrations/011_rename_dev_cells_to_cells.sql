-- migration: 011_rename_dev_cells_to_cells
-- description: rename dev_cells table to cells, rename RLS policies

ALTER TABLE dev_cells RENAME TO cells;
ALTER POLICY "dev_cells_public_read" ON cells RENAME TO "cells_public_read";
ALTER POLICY "dev_cells_auth_insert" ON cells RENAME TO "cells_auth_insert";
